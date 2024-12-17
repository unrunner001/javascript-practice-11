export function searchImage(image) {
  const params = new URLSearchParams({
    key: '47659008-74bbb6b2c2d0fee0411ee57da',
    q: image.trim(),
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const url = `https://pixabay.com/api/?${params}`;

  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
