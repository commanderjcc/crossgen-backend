cd /content/patch

npm install
pip install pika

cp -f patched_webui.py /content/stable-diffusion-webui/extensions/sd-webui-tunnels/scripts/try_cloudflare.py