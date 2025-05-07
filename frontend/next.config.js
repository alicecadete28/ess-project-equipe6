/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // necessário para exportação estática
    domains: ["picsum.photos"],
  },
  basePath: "/ess-project-equipe6", // obrigatório para GitHub Pages
};

export default nextConfig;
