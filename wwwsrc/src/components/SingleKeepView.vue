<template>
    <v-card>
        <v-card-media :src="activeKeep.url" height="400px">
        </v-card-media>
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">{{activeKeep.title}}</h3>
                <div>{{activeKeep.description}}</div>
            </div>
        </v-card-title>
        <v-card-actions>
            <v-btn flat class="orange--text">Share</v-btn>
            <v-btn flat class="orange--text add-keep" @click="selectKeep">Keep</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: 'SingleKeepView',
        data() {
            return {

            }
        },
        methods: {
            selectKeep() {
                this.$store.dispatch('showBottomVaultsBar')
            }
        },
        computed: {
            activeKeep() {
                return this.$store.state.activeKeep
            }
        },
        mounted() {
            this.$store.dispatch('selectKeep', this.activeKeep.id)
            this.$store.dispatch('findKeep', this.$route.params.keepId)
        },
        // destroyed() {
        //     this.$store.dispatch('clearActiveKeep')
        // }
    }

</script>