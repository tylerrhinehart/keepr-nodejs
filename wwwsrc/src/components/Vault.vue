<template>
    <v-card>
        <div @click="singleView">
            <v-card-media :src="imgUrl" height="200px">
            </v-card-media>
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">{{vault.title}}</h3>
                    <div>{{vault.description}}</div>
                </div>
            </v-card-title>
        </div>
        <v-card-actions>
            <v-btn flat class="orange--text">Share</v-btn>
            <v-btn flat class="orange--text">Explore</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import router from "../router";
import axios from "axios";
export default {
  name: "Vault",
  props: ["vault"],
  data() {
    return {
      imgUrl: ""
    };
  },
  mounted() {
    var production = !window.location.host.includes("localhost");
    var baseUrl = production
      ? "//tyler-keepr.herokuapp.com/"
      : "//localhost:3000/";

    axios.get(baseUrl + "api/vaults/" + this.vault._id + "/keeps").then(res => {
        this.imgUrl = res.data.data[0].url;
    })
  },
  methods: {
    singleView() {
      this.$store.dispatch("setActiveVault", this.vault);
      router.push("/vaults/" + this.vault._id);
    }
  }
};
</script>