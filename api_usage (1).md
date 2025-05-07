
# API Usage Guide – Open Media Search

The Open Media Search project fetches media using the Openverse API through its backend, which forwards frontend search queries.

## API Endpoint
```
https://api.openverse.org/v1/images?q={query}
```

## Backend Request Example
```js
app.get('/api/search', async (req, res) => {
    const { q } = req.query;
    const response = await axios.get(`https://api.openverse.org/v1/images?q=${q}`);
    res.json(response.data);
});
```

## Parameters

- `q`: Search keyword (required)
- `license`: Optional license filters
- `media_type`: Optional (e.g., image, audio)

## Sample Response
```json
{
  "results": [
    {
      "title": "Sunset",
      "url": "https://...",
      "thumbnail": "https://...",
      "license": "cc0"
    }
  ]
}
```

This result is parsed and displayed in the frontend.
