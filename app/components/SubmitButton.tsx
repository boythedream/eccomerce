"use client";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag } from "lucide-react";
import { useFormStatus } from "react-dom";
import { ButtonProps } from "@/components/ui/button";

interface SubmitButtonProps extends Omit<ButtonProps, 'children'> {
  text: string;
}

export function SubmitButton({ text, className, variant, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className={className} variant={variant} {...props}>
          <Loader2 className="m-2 w-6 h-6 animate-spin" />
          Please wait...
        </Button>
      ) : (
        <Button type="submit" className={className} variant={variant} {...props}>
          {text}
        </Button>
      )}
    </>
  );
}

export function ShoppingBagButton(){
  const { pending } = useFormStatus();
  return (
<>
{pending ? (
    <Button disabled size={"lg"} className="w-full mt-5">
    <Loader2 className="h-4 w-4 mr-4 animate-spin"/>
    Please wait...
</Button>
):(
    <Button size={"lg"} className="w-full mt-5" type="submit">
    <ShoppingBag className="h-4 w-4 mr-4"/>
    Add to Cart
</Button>
)}


</>
  )
  
}
export  function DeleteButton(){
  const { pending } = useFormStatus();
  return(

    <>
{pending ? (
  <Button disabled size={"lg"} className="w-full mt-5">
    <Loader2 className="h-4 w-4 mr-4 animate-spin"/>
    Removing...
</Button>
):(
  <Button size={"lg"} className="w-full mt-5" type="submit">
    Delete
</Button>
)}
</>
)
}


export function CheckoutButton(){
  const { pending } = useFormStatus();
  return(

    <>
{pending ? (
  <Button disabled size={"lg"} className="w-full mt-5">
    <Loader2 className="h-4 w-4 mr-4 animate-spin"/>
    Please wait...
</Button>
):(
  <Button size={"lg"} className="w-full mt-5" type="submit">
    proceed to checkout
</Button>
)}
</>
)
}