import Button from "@/components/Button";
import Input from "@/components/Input";
import { useAuthHandlers } from "@/hooks/useAuthHandlers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const LoginSchema = z.object({
  username: z
    .string({message: "Username cannot be empty"})
    .min(1, "Username is required")
    .refine((value) => value === "admin", "Invalid username. Must be admin"),
  password: z.string({message: "Password cannot be empty"}).min(1, "Password is required"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

const Login = () => {
  const { handleLogin, isPending } = useAuthHandlers();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    mode: "onTouched",
    defaultValues: {
      username: "" as "admin",
      password: "" as string
    }
  });

  const onSubmit = (data: LoginSchemaType) => {
    handleLogin(data);
  };

  return (
    <div className="max-w-lg mx-auto">
      <p className="text-center mt-32 mb-12 text-2xl">Aryon Enterprise</p>
      <div className="bg-white py-6 px-10 rounded-lg relative  border shadow-md">
        <p className="text-center">Welcome back</p>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Controller
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                id="username"
                label="Username"
                placeholder="Enter your username"
                value={value?.toLowerCase()}
                onChange={onChange}
                onBlur={onBlur}
                error={`${!!errors.username?.message}`}
                errorMessage={`${errors.username?.message}`}
              />
            )}
            name="username"
            control={control}
          />

          <Controller
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                type="password"
                id="password"
                label="Password"
                placeholder="Enter your password"
                value={value?.toLowerCase()}
                onChange={onChange}
                onBlur={onBlur}
                error={`${!!errors.password?.message}`}
                errorMessage={`${errors.password?.message}`}
              />
            )}
            name="password"
            control={control}
          />

          <Button type="submit" label="Sign in" loading={isPending} />
        </form>
      </div>
    </div>
  );
};

export default Login;
