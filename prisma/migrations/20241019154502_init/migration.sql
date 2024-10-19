-- CreateTable
CREATE TABLE "Producto" (
    "id_producto" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "id_categoria" INTEGER NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id_producto")
);

-- CreateTable
CREATE TABLE "CategoriaProducto" (
    "id_categoria" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "CategoriaProducto_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "Tienda" (
    "id_tienda" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,

    CONSTRAINT "Tienda_pkey" PRIMARY KEY ("id_tienda")
);

-- CreateTable
CREATE TABLE "Venta" (
    "id_venta" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "id_tienda" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "fecha_venta" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Venta_pkey" PRIMARY KEY ("id_venta")
);

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "CategoriaProducto"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Producto"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_id_tienda_fkey" FOREIGN KEY ("id_tienda") REFERENCES "Tienda"("id_tienda") ON DELETE RESTRICT ON UPDATE CASCADE;
