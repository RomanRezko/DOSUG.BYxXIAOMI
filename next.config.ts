import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Статический экспорт для shared-хостинга (Beget): генерирует out/ с готовым HTML
  output: 'export',
  trailingSlash: true,
  images: {
    // на статике оптимизация недоступна; в проекте используются обычные <img>
    unoptimized: true,
  },
};

export default nextConfig;
