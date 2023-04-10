cd /content/patch

npm install
pip install requests

cp -f patched_webui.py /content/stable-diffusion-webui/extensions/sd-webui-tunnels/scripts/try_cloudflare.py
node /content/patch/index.js &