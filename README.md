# browser-use_demo-v2

## Development

### How to start
1. Install libraries
```
npm install
pip install -r requirements.txt
```
2. Run Backend-server
```
python app.py
```
3. Run Frontend-server
```
npm run dev
```
4. Go to http://localhost:5173/

## Production

### Build
```
npm run build
```

### Preview
```
npm run preview
```
- Access: http://localhost:4173/

### Deployment
- The production build files will be generated in the `dist` directory
- Deploy the contents of the `dist` directory to your production server
- Make sure to configure environment variables in `.env.production`
