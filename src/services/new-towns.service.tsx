

const url = `https://analisi.transparenciacatalunya.cat/resource/9aju-tpwc.json`;

export const getTowns = (limit: number, offset: number) : Promise<any> => {
  const params = getUrlParams();
  const townsUrl = `${url}?${params}`;
  debugger;
  return fetch(townsUrl)
    .then(response => response.json())
    .then(data => {
      console.log('data', data);
    });
}

const getUrlParams = (limit: number = 2000, offset: number = 0) => {
  return new URLSearchParams({
    '$limit': `${limit}`,
    '$offset': `${offset}`
  })
}