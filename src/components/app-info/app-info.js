import './app-info.css';

const AppInfo = ({employees, majors}) => {
   return (
      <div className="app-info">
         <h1>Учет граждан состоящих в ТрО Одессы</h1>
         <h2>Общее число служащих: {employees}</h2>
         <h2>Число майоров: {majors}</h2>
      </div>
   )
}

export default AppInfo