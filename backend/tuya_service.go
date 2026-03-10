package main

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strconv"
	"strings"
	"time"
)

type TuyaService struct {
	ClientID    string
	AccessToken string
	DeviceID    string
	BaseURL     string
}

func NewTuyaService(clientID, accessToken, deviceID string) *TuyaService {
	return &TuyaService{
		ClientID:    clientID,
		AccessToken: accessToken,
		DeviceID:    deviceID,
		BaseURL:     "https://openapi.tuyaus.com/v1.0/iot-03",
	}
}

func (ts *TuyaService) GetDeviceStatus(deviceID string) (interface{}, error) {
	url := fmt.Sprintf("%s/devices/%s/status", ts.BaseURL, deviceID)
	return ts.makeRequest("GET", url, nil)
}

func (ts *TuyaService) GetDeviceFunctions(deviceID string) (interface{}, error) {
	url := fmt.Sprintf("%s/devices/%s/functions", ts.BaseURL, deviceID)
	return ts.makeRequest("GET", url, nil)
}

func (ts *TuyaService) ExecuteCommand(deviceID string, commands map[string]interface{}) (interface{}, error) {
	url := fmt.Sprintf("%s/devices/%s/commands", ts.BaseURL, deviceID)
	
	body, err := json.Marshal(commands)
	if err != nil {
		return nil, err
	}

	return ts.makeRequest("POST", url, body)
}

func (ts *TuyaService) makeRequest(method, url string, body []byte) (interface{}, error) {
	// Prepare headers
	t := strconv.FormatInt(time.Now().UnixMilli(), 10)
	
	// Build sign string
	signStr := method + "\n"
	signStr += "/v1.0/iot-03" + strings.TrimPrefix(url, ts.BaseURL) + "\n"
	signStr += ts.ClientID + "\n"
	signStr += t

	if method == "POST" && body != nil {
		signStr += "\n" + string(body)
	}

	// Generate sign
	sign := ts.generateSign(signStr)

	// Create request
	req, err := http.NewRequest(method, url, nil)
	if err != nil {
		return nil, err
	}

	if method == "POST" && body != nil {
		req.Body = io.NopCloser(strings.NewReader(string(body)))
		req.Header.Set("Content-Type", "application/json")
	}

	// Set headers
	req.Header.Set("client_id", ts.ClientID)
	req.Header.Set("access_token", ts.AccessToken)
	req.Header.Set("sign_method", "HMAC-SHA256")
	req.Header.Set("t", t)
	req.Header.Set("sign", sign)

	// Execute request
	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// Read response
	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	// Parse response
	var apiResp ApiResponse
	if err := json.Unmarshal(respBody, &apiResp); err != nil {
		return nil, err
	}

	if !apiResp.Success {
		return nil, fmt.Errorf("tuya API error: %v", apiResp)
	}

	return apiResp.Result, nil
}

func (ts *TuyaService) generateSign(signStr string) string {
	h := hmac.New(sha256.New, []byte(ts.AccessToken))
	h.Write([]byte(signStr))
	return strings.ToUpper(hex.EncodeToString(h.Sum(nil)))
}
