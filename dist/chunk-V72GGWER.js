import {
  deleteItem
} from "./chunk-PUKNPKRM.js";
import {
  toNextResponseFromError
} from "./chunk-6VESYXUA.js";

// src/inventory/items/handler/deleteItem.ts
async function DELETE(request, { params }) {
  try {
    const result = await deleteItem((await params).id);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  DELETE
};
