import pika

from pycloudflared import try_cloudflare
from modules.shared import cmd_opts
from gradio import strings

import os

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

channel.queue_declare(queue='variable_queue')

if cmd_opts.cloudflared:
    print("cloudflared detected, trying to connect...")
    port = cmd_opts.port if cmd_opts.port else 7860
    tunnel_url = try_cloudflare(port=port, verbose=False)
    os.environ['webui_url'] = tunnel_url.tunnel
    colab_url = os.getenv('colab_url')
    strings.en["SHARE_LINK_MESSAGE"] = f"Public WebUI Colab URL: {tunnel_url.tunnel}"
    channel.basic_publish(exchange='', routing_key='variable_queue', body=str(tunnel_url.tunnel))
    print('URL variable value sent')
    
if cmd_opts.multiple:
    print("all detected, cloudflared trying to connect...")
    port = cmd_opts.port if cmd_opts.port else 7860
    tunnel_url = try_cloudflare(port=port, verbose=False)
    os.environ['webui_url'] = tunnel_url.tunnel
    colab_url = os.getenv('colab_url')
    strings.en["SHARE_LINK_MESSAGE"] = f"Public WebUI Colab URL: {tunnel_url.tunnel}"
    strings.en["PUBLIC_SHARE_TRUE"] = f"Public WebUI Colab URL: {tunnel_url.tunnel}"
    channel.basic_publish(exchange='', routing_key='variable_queue', body=str(tunnel_url.tunnel))
    print('URL variable value sent')

connection.close()