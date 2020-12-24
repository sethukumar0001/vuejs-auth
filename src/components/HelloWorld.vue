<template lang="">
  <div>
    <p>{{msg}}</p>
    <ul>
      <li v-for="(artist,x) in artists" :key="x">
        {{artist.name}}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Home",
  props: ["msg"],

  data() {
    return {
      artists: [
        { name: "sk1", genre: "sk1", country: "sk1" },
        { name: "sk2", genre: "sk2", country: "sk2" },
        { name: "sk3", genre: "sk3", country: "sk3" },
      ],
    };
  },
};
</script>
<style lang="">
</style>