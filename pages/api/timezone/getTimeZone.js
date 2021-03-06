export default async function getTimeZone(req, res) {
  var axios = require('axios').default;
  const uri = process.env.RAPIDAPI_KEY;
  const tz = process.env.TZDB_KEY;

  var options = {
    method: 'GET',
    url: 'https://timezonedb.p.rapidapi.com/',
    params: {
      key: tz,
      lat: req.body.lat,
      lng: req.body.long,
      time: req.body.unixTime,
      format: 'json',
    },
    headers: {
      'x-rapidapi-host': 'timezonedb.p.rapidapi.com',
      'x-rapidapi-key': uri,
    },
  };

  return new Promise((resolve, _reject) => {
    axios
      .request(options)
      .then(function (response) {
        res.status(200).json(response.data);
        resolve();
      })
      .catch(function (error) {
        res.status(405).end();
        console.error(error);
        resolve();
      });
  });
}
