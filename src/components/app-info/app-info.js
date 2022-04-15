import './app-info.css';

const AppInfo = ({personCount, toIncrease}) => {
   return (
      <div className="app-info">
         <h1>Учет сотрудников в уездном городе N</h1>
         <h2>Общее число сотрудников: {personCount} </h2>
         <h2>Премию получат: {toIncrease} </h2>
      </div>
   )
};

export default AppInfo;