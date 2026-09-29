/**
 * Dynamic API Host Configuration Service
 * Allows Dogfood to connect to different API hosts (localhost, custom IP, docker, cloud, or offline mock).
 */

const STORAGE_KEY = 'dogfood_api_host_config';

export interface ApiHostConfig {
  mode: 'localhost' | 'docker' | 'custom' | 'mock';
  customUrl: string;
  timeoutMs: number;
}

export const DEFAULT_API_HOST_CONFIG: ApiHostConfig = {
  mode: 'localhost',
  customUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeoutMs: 5000,
};

export const getApiHostConfig = (): ApiHostConfig => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return { ...DEFAULT_API_HOST_CONFIG, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.warn('Failed to load api host config from storage', e);
  }
  return DEFAULT_API_HOST_CONFIG;
};

export const saveApiHostConfig = (config: ApiHostConfig): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.warn('Failed to save api host config', e);
  }
};

export const getEffectiveApiUrl = (): string => {
  const config = getApiHostConfig();
  switch (config.mode) {
    case 'docker':
      return 'http://localhost:8000';
    case 'custom':
      return config.customUrl.replace(/\/+$/, '');
    case 'mock':
      return 'mock://internal-ledger';
    case 'localhost':
    default:
      return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  }
};

export const testApiHostHealth = async (url: string): Promise<{ ok: boolean; message: string; latencyMs: number }> => {
  const startTime = Date.now();
  try {
    if (url.startsWith('mock://')) {
      return { ok: true, message: 'Mock In-Memory Engine Active', latencyMs: 1 };
    }

    const endpoint = `${url.replace(/\/+$/, '')}/`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(endpoint, {
      method: 'GET',
      signal: controller.signal,
      headers: { 'Accept': 'application/json' },
    });
    clearTimeout(timer);
    const latencyMs = Date.now() - startTime;

    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      return {
        ok: true,
        message: data.platform || `API Online (${res.status} OK)`,
        latencyMs,
      };
    } else {
      return {
        ok: false,
        message: `HTTP Error ${res.status}: ${res.statusText}`,
        latencyMs,
      };
    }
  } catch (err: any) {
    const latencyMs = Date.now() - startTime;
    return {
      ok: false,
      message: err.name === 'AbortError' ? 'Connection timed out (> 3.5s)' : (err.message || 'Host unreachable'),
      latencyMs,
    };
  }
};
