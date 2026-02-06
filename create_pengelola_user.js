const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    const password = await bcrypt.hash('pengelola123', 10)

    const user = await prisma.user.upsert({
        where: { email: 'pengelola@bptapera.go.id' },
        update: {
            username: 'pengelola',
            password: password,
            role: 'PENGELOLA',
        },
        create: {
            email: 'pengelola@bptapera.go.id',
            username: 'pengelola',
            name: 'Pengelola User',
            password: password,
            role: 'PENGELOLA',
        },
    })

    console.log('Pengelola user created/updated:', user)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
