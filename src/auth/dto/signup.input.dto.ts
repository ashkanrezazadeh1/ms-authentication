import {
  IsAlphanumeric,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
export class SignupInputDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @IsAlphanumeric()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @IsAlphanumeric()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @Matches(passwordRegEx, {
    message:
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  password: string;
}
