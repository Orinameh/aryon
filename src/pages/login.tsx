import Button from "@/components/Button";
import Input from "@/components/Input";
import { useAuthHandlers } from "@/hooks/useAuthHandlers";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { InferType, object, string } from "yup";

const LoginSchema = object({
  username: string().required("Username is required").oneOf(["admin"]),
  password: string().required("Password is required"),
});

export type LoginSchemaType = InferType<typeof LoginSchema>;


const Login = () => {
  const { handleLogin, isPending } = useAuthHandlers();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: yupResolver(LoginSchema),
    mode: "onTouched",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchemaType) => {
    handleLogin(data);
  };

  return (
    <div className="max-w-lg mx-auto">
      <p className="text-center mt-32 mb-12 text-2xl">Adryon Enterprise</p>
      <div className="bg-white py-6 px-10 rounded-lg relative  border shadow-md">
        <p className="text-center">Welcome back</p>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Controller
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                id="username"
                label="Username"
                placeholder="Enter your username"
                value={value.toLowerCase()}
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
                value={value.toLowerCase()}
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
