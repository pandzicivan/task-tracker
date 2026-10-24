import  { ref } from "vue";

export function usePaginatedEntities(fetchPage, limit = 10, offset = 0) {
  const loading = ref(false);
  const error = ref(null);
  const items = ref([]);
  const hasMore = ref(true);
  const itemsLength = ref(0);
  let offsetCounter = offset;

  // for infinite scroll
  async function loadMore() {
    if (loading.value) return;

    loading.value = true;
    error.value = null;

    try {
      const res = await fetchPage(limit, offsetCounter);
      items.value.push(...res);
      offsetCounter += limit;
      hasMore.value = res.length === limit;
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }

  // for classic pagination
  async function loadPage(page, itemsPerPage) {
    loading.value = true;
    error.value = null;

    try {
      const pageOffset = offset + (page - 1) * itemsPerPage;
      const res = await fetchPage(itemsPerPage, pageOffset);
      items.value = res;
      hasMore.value = res.length === itemsPerPage;
      itemsLength.value = pageOffset + res.length + (hasMore.value ? 1 : 0);
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }


  function reset() {
    items.value = [];
    offsetCounter = offset;
    hasMore.value = true;
    error.value = null;
  }
  
  return  { items, error, loading, hasMore, itemsLength, loadMore, loadPage, reset };
}
