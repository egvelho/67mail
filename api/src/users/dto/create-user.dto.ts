import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(2)
    @MaxLength(67)
    name!: string

    @IsString()
    @MinLength(2)
    @MaxLength(67)
    surname!: string

    @IsEmail()
    email!: string

    @IsString()
    @MinLength(8)
    @MaxLength(67)
    password!: string
}
