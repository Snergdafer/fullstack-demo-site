# Setup

npm i  
npm run dev

# In a seperate terminal

cd server
python -m venv .venv  
source .venv/bin/activate  
pip install "fastapi[standard]"  
pip install sqlmodel  
pip install passlib  
pip install pyjwt  
pip install -r requirements.txt  
fastapi dev main.py
