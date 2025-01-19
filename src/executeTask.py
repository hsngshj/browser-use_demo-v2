from langchain_openai import ChatOpenAI
from browser_use import Agent
import asyncio
import sys
import json

async def main(task):
    agent = Agent(
        task=task,
        llm=ChatOpenAI(model="gpt-4o"),
    )
    result = await agent.run()
    print(json.dumps({"result": result}))

if __name__ == "__main__":
    task = sys.argv[1]
    asyncio.run(main(task))
