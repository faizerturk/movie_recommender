const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '485a55e9c679c1b72cc2b422154e35fd',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;