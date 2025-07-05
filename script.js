const board=document.getElementById('board');
const statusText=document.getElementById('status');
const restartBtn=document.getElementById('restartBtn');

let player ='X', active=true,state=Array(9).fill('');
const wins=[
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

[...Array(9)].forEach((_, i)=>{
  const cell=document.createElement('div');
  cell.className='cell';
  cell.onclick=()=>move(i,cell);
  board.appendChild(cell);
});
function move (i,cell){
  if(state[i] || !active)return;
  state[i]=player;
  cell.textContent=player;
  cell.classList.add(player);

  const win =wins.find(c=> c.every(j=>state[j]==player));
  if(win){
    win.forEach(j => board.children[j].classList.add('winner'));
    statusText.textContent= `Player ${player} wins!`;
    active=false;
  }
  else if (state.every(c => c)){
    statusText.textContent="It's a draw!";
    active=false;
  }
  else{
    player=player === 'X' ? 'O' : 'X';
    statusText.textContent=`Player ${player}'s turn`;
  }
}

restartBtn.onclick=()=>{
  state.fill('');
  player='X';
  active=true;
  statusText.textContent=`Player ${player}'s turn`;
  [...board.children].forEach(c=>{
    c.textContent='';
    c.className='cell';
  });
};