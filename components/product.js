import React from "react";
import styles from "../styles/Product.module.css";
import Buy from "./BuySol";
import Image from "next/image"

export default function Product({ product }) {
  const { id, name, price, description, image_url } = product;

  return (
    <div className={styles.product_container}>
      <div >
        <Image className={styles.product_image} src={image_url} alt={name} height={250} width={250} />
      </div>

      <div className={styles.product_details}>
        <div className={styles.product_text}>
          <div className={styles.product_title}>{name}</div>
          <div className={styles.product_description}>{description}</div>
        </div>

        <div className={styles.product_action}>
          <div className={styles.product_price}>{price} SOL</div>
          {/* I'm hardcoding these for now, we'll fetch the hash from the API later*/}
          <Buy itemID={id} />
        </div>
      </div>
    </div>
  );
}