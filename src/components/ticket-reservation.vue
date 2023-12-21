<script setup lang="ts">
import type {IFlight} from "@/models/IFlights";

const props = defineProps<{
  flight: IFlight
}>();

const emits = defineEmits(["reserve", "reserve-points"]);


const reserveTicket = () => {
  emits('reserve', props.flight.price)
}
const reserveTicketWithPoints = () => {
  emits('reserve-points', props.flight.price)
}
</script>

<template>
  <div class="flight-card">
    <div class="flight-card-header">

    </div>
    <div class="flight-card-content">
      <div class="flight-row">
        <div class="flight-from">
          <span class="from-code">{{ flight.departureAbbreviation }}</span>
          <span class="from-city">{{ flight.departurePlace }}</span>
        </div>
        <div class="plane">
          <img src="https://cdn.onlinewebfonts.com/svg/img_537856.svg" alt="">
        </div>
        <div class="flight-to">
          <span class="to-code">{{ flight.destinationAbbreviation }}</span>
          <span class="to-city">{{ flight.destinationPlace }}</span>
        </div>
      </div>
      <div class="flight-details-row">
        <div class="flight-operator">
          <span class="title">OPERATOR</span>
          <span class="detail">{{ flight.operator }}</span>
        </div>
        <div class="flight-number">
          <span class="title">FLIGHT</span>
          <span class="detail">{{ flight.flightCode }}</span>
        </div>
        <div class="flight-class">
          <span class="title">CLASS</span>
          <span class="detail">{{ flight.flightClass }}</span>
        </div>
      </div>
      <div class="flight-reserve">
        <Button :label="'Reserve - ' + props.flight.price + ' $'" @click="reserveTicket" severity="info" text raised/>
        <Button label="Reserve with points" @click="reserveTicketWithPoints" severity="success" text raised/>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:100,400");

html,
* {
  box-sizing: border-box;
  font-size: 16px;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Roboto", sans-serif;
}

.flight-card {
  width: 555px;
  height: 360px;
  margin: 100px auto;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);

  .flight-card-header {
    height: 10px;
    width: 100%;
    background: linear-gradient(to bottom, #264b76 0%, #002c5f 100%);
    padding: 10px 10px;
    border-bottom: 7px solid #6dbe47;
    position: relative;
  }

  .flight-card-content {
    width: 100%;
    height: auto;
    display: inline-block;

    .flight-row {
      width: 100%;
      padding: 50px 50px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;

      .plane {
        text-align: center;
        position: relative;

        img {
          width: 30px;
          margin-top: 30px
        }

        &:before {
          content: "";
          width: 60px;
          height: 3px;
          background: #efefef;
          position: absolute;
          top: 45px;
          left: -5px;
        }

        &:after {
          content: "";
          width: 60px;
          height: 3px;
          background-color: #efefef;
          position: absolute;
          top: 45px;
          right: -1px;
        }
      }
    }

    .flight-from {
      text-align: left;
      float: left;
    }

    .flight-to {
      text-align: right;
      float: right;
    }

    .flight-from,
    .flight-to {
      span {
        display: block;
      }

      .from-code,
      .to-code {
        font-size: 15px;
        color: #002c5f;
        font-weight: 200;
      }

      .from-city,
      .to-city {
        font-size: 18px;
        color: #002c5f;
        font-weight: 400;
      }
    }

    .flight-details-row {
      width: 100%;
      display: grid;
      padding: 30px 50px;
      grid-template-columns: 1fr 1fr 1fr;

      span {
        display: block;
      }

      .title {
        color: #6a8597;
        font-size: 16px;
        letter-spacing: 3px;
      }

      .detail {
        margin-top: 0.2em;
        color: #002c5f;
        font-size: 18px;
      }

      .flight-operator {
        text-align: left;
        float: left;
      }

      .flight-class {
        float: right;
        text-align: right;
      }

      .flight-number {
        padding-left: 80px;
      }

      .flight-reserve {
        display: flex;
        justify-content: center
      }
    }
  }
}

</style>