import json
from flask import Flask, render_template, request
from langchain_openai import ChatOpenAI
from browser_use import Agent
import asyncio
from dotenv import load_dotenv
import os
from flask_cors import CORS

# .envファイルを読み込む
load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/execute', methods=['POST'])
def execute():
    data = request.json
    task = data.get('task') + " 日本語で回答してください。"
    model = "gpt-4o-mini"
    result = asyncio.run(run_agent(task, model))
    result_json_str = json.dumps(result, default=lambda o: o.__dict__, indent=4, ensure_ascii=False)
    return result_json_str

async def run_agent(task, model):
    agent = Agent(
        task=task,
        llm=ChatOpenAI(model=model, api_key=os.getenv("OPENAI_API_KEY")),  # モデルを使用
    )
    result = await agent.run()
    return result

if __name__ == '__main__':
    app.run(debug=True)
