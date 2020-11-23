import moment from 'moment';

const formatDate = (digitStr) => {
  return moment(new Date(parseInt(digitStr.padEnd(13,'0')))).format('MMM Do YYYY');
}

export default formatDate;