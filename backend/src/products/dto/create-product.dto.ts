import { IsString, IsNumber, IsNotEmpty, IsOptional, IsEnum, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'La descripción es requerida' })
  description: string;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0, { message: 'El precio debe ser mayor a 0' })
  price: number;

  @IsString()
  @IsNotEmpty({ message: 'La ubicación es requerida' })
  location: string;

  @IsNumber({}, { message: 'El área debe ser un número' })
  @Min(1, { message: 'El área debe ser mayor a 0' })
  area: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Las habitaciones deben ser un número' })
  @Min(0)
  bedrooms?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Los baños deben ser un número' })
  @Min(0)
  bathrooms?: number;

  @IsEnum(['sale', 'rent'], { message: 'El tipo debe ser "sale" o "rent"' })
  type: string;

  @IsEnum(['house', 'apartment', 'land', 'commercial'], { 
    message: 'El tipo de propiedad debe ser "house", "apartment", "land" o "commercial"' 
  })
  propertyType: string;
}
