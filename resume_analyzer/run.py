import multiprocessing
import os
import shutil
import subprocess
import sys

import uvicorn

react_process = None  

def run_fastapi():
    print("\033[92mStarting FastAPI backend at http://127.0.0.1:8000\033[0m")
    try:
        uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
    except Exception as e:
        print(f"\033[91m[FastAPI] Failed to start: {e}\033[0m")

def run_react():
    global react_process
    frontend_path = os.path.join(os.getcwd(), "frontend")
    package_json_path = os.path.join(frontend_path, "package.json")

    if not os.path.exists(frontend_path):
        print("\033[91m'frontend/' directory not found.\033[0m")
        return
    if not os.path.isfile(package_json_path):
        print("\033[91mpackage.json not found in 'frontend/' directory.\033[0m")
        return
    if not shutil.which("npm"):
        print("\033[91mnpm is not installed or not found in PATH. Please install Node.js.\033[0m")
        return

    with open(package_json_path, "r", encoding="utf-8") as f:
        content = f.read()
        use_dev = '"dev"' in content

    command = ["npm", "run", "dev"] if use_dev else ["npm", "start"]
    label = "dev" if use_dev else "start"
    print(f"\033[96mStarting React frontend with `npm run {label}` at http://localhost:3000\033[0m")

    try:
        react_process = subprocess.Popen(command, cwd=frontend_path, shell=(os.name == "nt"))
        react_process.wait()  # Wait for process to finish unless terminated externally
    except Exception as e:
        print(f"\033[91m[React] Failed to start: {e}\033[0m")

def main():
    try:
        multiprocessing.set_start_method("spawn")
    except RuntimeError:
        pass

    backend = multiprocessing.Process(target=run_fastapi)
    frontend = multiprocessing.Process(target=run_react)

    try:
        backend.start()
        frontend.start()

        backend.join()
        frontend.join()

    except KeyboardInterrupt:
        print("\n\033[93mStopping both servers gracefully...\033[0m")
        backend.terminate()
        frontend.terminate()
        if react_process:
            react_process.terminate()
        backend.join()
        frontend.join()
        sys.exit(0)

if __name__ == "__main__":
    main()
