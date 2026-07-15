const { Client } = require('pg');

const connectionString = 'postgresql://postgres.qciatabsdkciojgsnnll:FlavordashUndira@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres';

const client = new Client({
  connectionString,
});

async function migrate() {
  try {
    await client.connect();
    console.log('Connected to DB');

    // Buat tabel foods
    await client.query(`
      CREATE TABLE IF NOT EXISTS foods (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price VARCHAR(50) NOT NULL,
        image_url TEXT NOT NULL
      );
    `);
    console.log('Table "foods" created or already exists.');

    // Masukkan data dummy jika masih kosong
    const res = await client.query('SELECT COUNT(*) FROM foods');
    if (parseInt(res.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO foods (title, description, price, image_url) VALUES 
        ('Nasi Goreng Spesial', 'Nasi goreng dengan bumbu rempah pilihan, telur, dan ayam suwir yang lezat.', 'Rp 25.000', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400'),
        ('Mie Ayam Bakso', 'Mie kuning kenyal dengan topping ayam cincang, bakso, dan sayuran segar.', 'Rp 20.000', 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400'),
        ('Ayam Bakar Kecap', 'Ayam kampung dibakar dengan bumbu kecap manis dan rempah pilihan.', 'Rp 35.000', 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400'),
        ('Soto Betawi', 'Kuah santan kental dengan daging sapi, kentang, dan tomat segar.', 'Rp 28.000', 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400'),
        ('Gado-gado Jakarta', 'Sayuran rebus segar dengan bumbu kacang gurih dan kerupuk renyah.', 'Rp 18.000', 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400'),
        ('Rendang Padang', 'Daging sapi empuk dimasak dengan santan dan bumbu rempah khas Minang.', 'Rp 45.000', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'),
        ('Pempek Palembang', 'Olahan ikan tenggiri dengan kuah cuka asam manis yang khas.', 'Rp 22.000', 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400'),
        ('Es Teh Manis', 'Teh manis segar dengan es batu, cocok menemani makananmu.', 'Rp 5.000', 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=400')
      `);
      console.log('Inserted dummy data into "foods" table.');
    }

    // Buat tabel orders
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id UUID,
        status VARCHAR(50) DEFAULT 'Sedang Diantar',
        total_amount VARCHAR(50) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Table "orders" created or already exists.');

    console.log('Migration completed successfully!');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await client.end();
  }
}

migrate();
