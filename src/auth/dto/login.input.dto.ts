import {
  IsAlphanumeric,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;
export class LoginInputDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @IsAlphanumeric()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  /*
  @Matches(passwordRegEx, {
    message:
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  */
  password: string;
}
