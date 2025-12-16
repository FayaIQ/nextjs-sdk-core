import {
  deleteItem
} from "./chunk-ION3OSYQ.js";
import {
  toNextResponseFromError
} from "./chunk-3ZI5QZAW.js";

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
