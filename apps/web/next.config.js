/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false, // React의 Strict 모드 활성화
  transpilePackages: ['@repo/ui'], // 외부 패키지 트랜스파일 설정
  images: {
    domains: [
      'www.naver.com',
      'adaptors-bucket.s3.ap-northeast-2.amazonaws.com',
      'i.pinimg.com',
      'picsum.photos',
      'd2v80xjmx68n4w.cloudfront.net',
      'www.sportschosun.com',
      'cdn.inflearn.com',
      'image.tmdb.org',
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb', // 5MB로 제한을 증가
    },
  },
};
