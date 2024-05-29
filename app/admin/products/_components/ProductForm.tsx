import { addProduct } from "@/app/admin/_actions/products";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButton";

export default function ProductForm() {
  const [error, action] = useFormState(addProduct, {});
  const [priceInCents, setPriceInCents] = useState<number>();

  return (
    <form action={action} className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='name'>Name</Label>
        <Input type='text' id='name' name='name' required />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='priceInCents'>Price In Cents</Label>
        <Input
          type='number'
          id='priceInCents'
          name='priceInCents'
          value={priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
          required
        />
        <div className='text-muted-forground'>
          {formatCurrency((priceInCents || 0) / 100)}
        </div>
        {error.priceInCents && <div className="text-destructive">{error.priceInCents}</div>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='description'>Description</Label>
        <Textarea id='description' name='description' required />
        {error.description && <div className="text-destructive">{error.description}</div>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='file'>File</Label>
        <Input type='file' id='file' name='file' required />
        {error.file && <div className="text-destructive">{error.file}</div>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='image'>Image</Label>
        <Input type='file' id='image' name='image' required />
        {error.image && <div className="text-destructive">{error.image}</div>}
      </div>

      <SubmitButton />
    </form>
  );
}
