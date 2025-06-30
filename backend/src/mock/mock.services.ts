import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// Mock data para simular la base de datos
const mockUsers = new Map();
const mockProducts = [
  {
    _id: '1',
    name: "Casa moderna en Las Condes",
    description: "Hermosa casa de 3 pisos con vista panorámica",
    price: 350000000,
    location: "Las Condes, Santiago",
    area: 250,
    bedrooms: 4,
    bathrooms: 3,
    type: "sale",
    propertyType: "house",
    imageUrl: "https://example.com/casa1.jpg"
  },
  {
    _id: '2',
    name: "Departamento céntrico en Providencia",
    description: "Moderno departamento de 2 dormitorios",
    price: 450000,
    location: "Providencia, Santiago",
    area: 80,
    bedrooms: 2,
    bathrooms: 2,
    type: "rent",
    propertyType: "apartment",
    imageUrl: "https://example.com/depto1.jpg"
  }
];

export interface MockUser {
  _id: string;
  email: string;
  password: string;
  favoriteProducts: string[];
}

@Injectable()
export class MockUsersService {
  private users = mockUsers;
  private nextId = 1;

  async findOne(email: string): Promise<MockUser | null> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async findById(id: string): Promise<MockUser | null> {
    return this.users.get(id) || null;
  }

  async create(email: string, password: string): Promise<MockUser> {
    const existingUser = await this.findOne(email);
    
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = this.nextId.toString();
    this.nextId++;
    
    const newUser: MockUser = {
      _id: userId,
      email,
      password: hashedPassword,
      favoriteProducts: [],
    };
    
    this.users.set(userId, newUser);
    return newUser;
  }

  async addFavoriteProduct(userId: string, productId: string): Promise<MockUser | null> {
    const user = this.users.get(userId);
    
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (!user.favoriteProducts.includes(productId)) {
      user.favoriteProducts.push(productId);
    }
    
    return user;
  }

  async removeFavoriteProduct(userId: string, productId: string): Promise<MockUser | null> {
    const user = this.users.get(userId);
    
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    user.favoriteProducts = user.favoriteProducts.filter(id => id !== productId);
    return user;
  }
}

@Injectable()
export class MockProductsService {
  private products = mockProducts;

  async findAll() {
    return this.products;
  }

  async findOne(id: string) {
    const product = this.products.find(p => p._id === id);
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  async create(createProductDto: any) {
    const newProduct = {
      _id: (this.products.length + 1).toString(),
      ...createProductDto,
    };
    this.products.push(newProduct);
    return newProduct;
  }
}
