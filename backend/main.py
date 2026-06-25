from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="MyFinance API",
    description="Personal finance tracker with AI powered categorization and insights",
    version="1.0.0"
)

# CORS middleware. Permits requests between frontend and backend.
# TODO: restrict allow_origins to the production domain before deployment.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Test endpoint to verify the service is running.
@app.get("/")
def read_root():
    return {"status": "ok", "message": "MyFinance API is running!"}
