const favoriteWebtoons = [
  { thumbnail: '/assets/images/photo.png', title: '웹툰 1', author: '작가 1' },
  { thumbnail: '/assets/images/photo.png', title: '웹툰 2', author: '작가 2' },
  { thumbnail: '/assets/images/photo.png', title: '웹툰 3', author: '작가 1' },
  { thumbnail: '/assets/images/photo.png', title: '웹툰 4', author: '작가 2' },
];

export default function FavoritesPage() {
  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='max-w-4xl mx-auto p-6'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>관심 웹툰</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {favoriteWebtoons.map((webtoon, index) => (
            <div
              key={index}
              className='bg-white shadow-md rounded-lg flex items-center overflow-hidden'
            >
              <img
                src={webtoon.thumbnail}
                alt={webtoon.title}
                className='w-48 h-48 ml-4 object-cover'
              />
              <div className='p-4'>
                <h2 className='text-lg font-bold text-gray-800'>
                  {webtoon.title}
                </h2>
                <p className='text-gray-600'>{webtoon.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
