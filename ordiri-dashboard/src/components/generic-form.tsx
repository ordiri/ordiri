import { useForm } from "react-hook-form";
// import * as yup from "yup";
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node } from "@ordiri/client-typescript";


export type GenericFormProps<T> = {
  data: T
}
export default function GenericForm<T>({data}: GenericFormProps<T>) {
    const { register, handleSubmit, formState: { errors } } = useForm<T>({
      // resolver: yupResolver(schema)
    });
    const onSubmit = (data: T) => console.log(data);
  // const schema = yup.object({
  //   firstName: yup.string().required(),
  //   age: yup.number().positive().integer().required(),
  // }).required();

    return (
      <form onSubmit={handleSubmit(onSubmit)}>

        <input type="submit" />
      </form>
    );
}

export const NodeForm = ({data}:{data: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node}) => <GenericForm data={data} />