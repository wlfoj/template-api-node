const amqp = require('amqplib');

const RABBITMQ_URL = 'amqp://localhost'; // Substitua pela URL do seu RabbitMQ
const QUEUE_NAME = 'my_queue'; // Substitua pelo nome da sua fila


class RabbitMQ{
    static channel;

    static async connectRabbitMQ() {
        try {
            const connection = await amqp.connect(RABBITMQ_URL);
            this.channel = await connection.createChannel();
            await this.channel.assertQueue(QUEUE_NAME, {
                durable: true
            });
            console.log('Conectado ao RabbitMQ');
        } catch (error) {
            console.error('Erro ao conectar ao RabbitMQ:', error);
        }
    }

    static async sendMessage(message) {
        if (!this.channel) {
            console.error('Canal não está disponível');
            return;
        }
        try {
            await this.channel.sendToQueue(QUEUE_NAME, Buffer.from(message), {
                persistent: true
            });
            console.log('Mensagem enviada para a fila');
        } catch (error) {
            console.error('Erro ao enviar mensagem para a fila:', error);
        }
    }
}



module.exports = {
    RabbitMQ
}