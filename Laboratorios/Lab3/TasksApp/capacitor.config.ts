import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'TasksApp',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
