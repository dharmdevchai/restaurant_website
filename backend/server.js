const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('./restaurant.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Initialize default admin if none exists
const initializeAdmin = () => {
  db.get("SELECT COUNT(*) as count FROM admins", [], (err, row) => {
    if (err) {
      console.error('Error checking admin count:', err.message);
      return;
    }
    
    if (row.count === 0) {
      bcrypt.hash('admin123', 10, (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err.message);
          return;
        }
        
        db.run("INSERT INTO admins (username, password) VALUES (?, ?)", ['admin', hash], (err) => {
          if (err) {
            console.error('Error creating default admin:', err.message);
          } else {
            console.log('Default admin created');
          }
        });
      });
    }
  });
};

// Initialize default gallery images if none exist
const initializeGallery = () => {
  db.get("SELECT COUNT(*) as count FROM gallery_images", [], (err, row) => {
    if (err) {
      console.error('Error checking gallery count:', err.message);
      return;
    }
    
    if (row.count === 0) {
      const defaultImages = [
        { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop', alt: 'Restaurant Interior' },
        { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop', alt: 'Dining Area' },
        { url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop', alt: 'Grilled Salmon' },
        { url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop', alt: 'Fresh Salad' },
        { url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop', alt: 'Pizza' },
        { url: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&h=600&fit=crop', alt: 'Chef Cooking' },
        { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop', alt: 'Food Preparation' },
        { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop', alt: 'Restaurant Ambiance' },
        { url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop', alt: 'Desserts' },
        { url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop', alt: 'Fine Dining' },
        { url: 'https://images.unsplash.com/photo-1554679665-f5537f187268?w=800&h=600&fit=crop', alt: 'Wine Selection' },
        { url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&h=600&fit=crop', alt: 'Burger Special' }
      ];
      
      defaultImages.forEach(image => {
        db.run("INSERT INTO gallery_images (url, alt) VALUES (?, ?)", [image.url, image.alt], (err) => {
          if (err) {
            console.error('Error inserting default image:', err.message);
          }
        });
      });
      
      console.log('Default gallery images created');
    }
  });
};

// Create tables when the database is ready
db.serialize(() => {
  // Create tables if they don't exist
  db.run(`CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    guests TEXT NOT NULL,
    specialRequests TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS gallery_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL,
    alt TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  
  // Initialize default data after tables are created
  setTimeout(() => {
    initializeAdmin();
    initializeGallery();
  }, 1000);
});

// Auth routes
app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password } = req.body;
    
    db.get("SELECT * FROM admins WHERE username = ?", [username], (err, row) => {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }
      
      if (!row) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      bcrypt.compare(password, row.password, (err, result) => {
        if (err || !result) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        res.json({ message: 'Login successful', username: row.username });
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/change-password', (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // In a real app, you would verify the user's identity with a token
    // For this example, we'll just check the current admin password
    db.get("SELECT * FROM admins WHERE username = 'admin'", [], (err, row) => {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }
      
      if (!row) {
        return res.status(404).json({ message: 'Admin not found' });
      }
      
      bcrypt.compare(currentPassword, row.password, (err, result) => {
        if (err || !result) {
          return res.status(401).json({ message: 'Current password is incorrect' });
        }
        
        if (newPassword.length < 6) {
          return res.status(400).json({ message: 'New password must be at least 6 characters' });
        }
        
        bcrypt.hash(newPassword, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ message: 'Server error' });
          }
          
          db.run("UPDATE admins SET password = ? WHERE username = 'admin'", [hash], (err) => {
            if (err) {
              return res.status(500).json({ message: 'Server error' });
            }
            
            res.json({ message: 'Password changed successfully' });
          });
        });
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Reservation routes
app.get('/api/reservations', (req, res) => {
  try {
    db.all("SELECT * FROM reservations ORDER BY createdAt DESC", [], (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }
      res.json(rows);
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/reservations', (req, res) => {
  try {
    const { name, email, phone, date, time, guests, specialRequests } = req.body;
    
    db.run("INSERT INTO reservations (name, email, phone, date, time, guests, specialRequests) VALUES (?, ?, ?, ?, ?, ?, ?)", 
      [name, email, phone, date, time, guests, specialRequests], 
      function(err) {
        if (err) {
          return res.status(500).json({ message: 'Server error' });
        }
        
        // Get the inserted record
        db.get("SELECT * FROM reservations WHERE id = ?", [this.lastID], (err, row) => {
          if (err) {
            return res.status(500).json({ message: 'Server error' });
          }
          res.status(201).json(row);
        });
      });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/reservations/:id', (req, res) => {
  try {
    const { id } = req.params;
    db.run("DELETE FROM reservations WHERE id = ?", [id], function(err) {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }
      
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
      
      res.json({ message: 'Reservation deleted successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Gallery routes
app.get('/api/gallery', (req, res) => {
  try {
    db.all("SELECT * FROM gallery_images ORDER BY createdAt DESC", [], (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }
      res.json(rows);
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/gallery', (req, res) => {
  try {
    const { url, alt } = req.body;
    
    db.run("INSERT INTO gallery_images (url, alt) VALUES (?, ?)", [url, alt], function(err) {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }
      
      // Get the inserted record
      db.get("SELECT * FROM gallery_images WHERE id = ?", [this.lastID], (err, row) => {
        if (err) {
          return res.status(500).json({ message: 'Server error' });
        }
        res.status(201).json(row);
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/gallery/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { url, alt } = req.body;
    
    db.run("UPDATE gallery_images SET url = ?, alt = ? WHERE id = ?", [url, alt, id], function(err) {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }
      
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Image not found' });
      }
      
      // Get the updated record
      db.get("SELECT * FROM gallery_images WHERE id = ?", [id], (err, row) => {
        if (err) {
          return res.status(500).json({ message: 'Server error' });
        }
        res.json(row);
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/gallery/:id', (req, res) => {
  try {
    const { id } = req.params;
    db.run("DELETE FROM gallery_images WHERE id = ?", [id], function(err) {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }
      
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Image not found' });
      }
      
      res.json({ message: 'Image deleted successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});