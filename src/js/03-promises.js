import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  let newDelay = parseInt(delay.value);
  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, newDelay).then(onSuccess).catch(onError);
    newDelay += parseInt(step.value);
  }
}

function onSuccess(success) {
  return Notify.success(success);
}

function onError(error) {
  return Notify.failure(error);
}