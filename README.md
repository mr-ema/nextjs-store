# Basic NextJs Store

- This is a basic ecommerce site made in nextjs using webpay, mongoose and yum.

## Important
- I made this just to practice my code so don't use it in production. 
- You must add a .env or .env.local file with `DATABASE_URL`.
- I save the cart on local storage, but for extra security it should be encrypt.
- Or you can use cookies.
- Or a serverside cart with an encrypt token.

## To Test Pay Method Use:
- Credit Cart: 4051885600446623
- Rut: 11.111.111-1
- Password: 123

## In This Store You Can:
- Upload products without custom picture for the momen.
- Remove those products.
- Add-remove products from cart.
- Add order to database when complete delivery form.
- When pay successful update order STATUS.

## Run Locally 
- Clone the repository and run:

```bash
    npm install
```
Development:
```bash
    npm run dev
```
Production:
```bash
    npm run build
    npm run start
```
    

## Demo

https://nextjs-store-mr-ema.vercel.app/

