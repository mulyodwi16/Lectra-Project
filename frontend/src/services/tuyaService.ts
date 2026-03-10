/// <reference types="vite/client" />
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000
})

export interface DeviceStatus {
    code: string
    value: any
}

export interface DeviceFunction {
    code: string
    name: string
    desc: string
    type: string
    values: string
}

export const tuyaService = {
    getDeviceStatus: (deviceId: string) => api.get(`/devices/${deviceId}/status`),
    getDeviceFunctions: (deviceId: string) => api.get(`/devices/${deviceId}/functions`),
    executeCommand: (deviceId: string, commands: any) => api.post(`/devices/${deviceId}/commands`, commands),
    listDevices: () => api.get('/devices/list'),
    healthCheck: () => api.get('/health')
}
