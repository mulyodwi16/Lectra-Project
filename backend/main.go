package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

type Device struct {
	ID       string      `json:"id"`
	Name     string      `json:"name"`
	Category string      `json:"category"`
	Status   []Status    `json:"status"`
	Functions []Function `json:"functions"`
}

type Status struct {
	Code  string      `json:"code"`
	Value interface{} `json:"value"`
}

type Function struct {
	Code   string `json:"code"`
	Name   string `json:"name"`
	Desc   string `json:"desc"`
	Type   string `json:"type"`
	Values string `json:"values"`
}

type ApiResponse struct {
	Result  interface{} `json:"result"`
	Success bool        `json:"success"`
	T       int64       `json:"t"`
	Tid     string      `json:"tid"`
}

var (
	tuya *TuyaService
)

func main() {
	// Load env
	if err := godotenv.Load(".env"); err != nil {
		log.Println("No .env file found, using system env")
	}

	// Init Tuya Service
	tuya = NewTuyaService(
		os.Getenv("TUYA_CLIENT_ID"),
		os.Getenv("TUYA_ACCESS_TOKEN"),
		os.Getenv("TUYA_DEVICE_ID"),
	)

	// Setup Fiber
	app := fiber.New(fiber.Config{
		AppName: "Lectra API v1.0",
	})

	// CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders: "Origin,Content-Type,Accept,Authorization",
	}))

	// Routes
	api := app.Group("/api/v1")
	
	// Device endpoints
	api.Get("/devices/:deviceId/status", getDeviceStatus)
	api.Get("/devices/:deviceId/functions", getDeviceFunctions)
	api.Post("/devices/:deviceId/commands", executeDeviceCommand)
	api.Get("/devices/list", listDevices)

	// Health check
	api.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status": "ok",
			"timestamp": fiber.Now().Unix(),
		})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	fmt.Printf("🚀 Lectra Backend running on http://0.0.0.0:%s\n", port)
	if err := app.Listen(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

// Handlers
func getDeviceStatus(c *fiber.Ctx) error {
	deviceID := c.Params("deviceId")
	
	status, err := tuya.GetDeviceStatus(deviceID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(status)
}

func getDeviceFunctions(c *fiber.Ctx) error {
	deviceID := c.Params("deviceId")
	
	functions, err := tuya.GetDeviceFunctions(deviceID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(functions)
}

func executeDeviceCommand(c *fiber.Ctx) error {
	deviceID := c.Params("deviceId")
	
	var payload map[string]interface{}
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	result, err := tuya.ExecuteCommand(deviceID, payload)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(result)
}

func listDevices(c *fiber.Ctx) error {
	// For now, return mock data
	devices := []Device{
		{
			ID:       "eb4d3c6ac2d0b102fct3tt",
			Name:     "Smart Lamp",
			Category: "kg",
			Status:   []Status{},
			Functions: []Function{},
		},
	}

	return c.JSON(devices)
}
