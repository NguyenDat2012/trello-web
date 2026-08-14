import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sort'

import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {

  const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  // Yêu cầu chuột di chuyển 10px thì mới kích hoạt event, fix trường hợp click bị gọi event
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  //Nhấn giữ 250ms và dung sai của cảm ứng 500px thì mới kích hoạt event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

  //Ưu tiến sử dụng kết hợp 2 loại sensors là mouse và touch để có trải nghiệm trên mobile tốt nhất, không bị bug
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  const [activeDragItemId, setActiveDragItemId] = useState(null)

  const [activeDragItemType, setActiveDragItemType] = useState(null)

  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(()=> {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  //Tìm một cái column theo cardIf
  const findColumByCardId = (cardId) => {
    //Nên dùng c.cards thay vì c.cardOrderIds bởi vì ở bước handleDragOver chúng ta sẽ làm dữ liệu cho cards hoàn chỉnh trước
    //rồi mới tạo ra cardOrderIds mới
    return orderedColumns.find(column => column.cards?.map(card => card._id)?.includes(cardId))
  }

  //Trigger khi kết thúc hành động kéo 1 phần tử
  const handleDragEnd = (event) => {
    console.log('handleDragEnd: ', event)

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      console.log('Hành động kéo thả Card - Tạm thời không làm gì cả')
      return
    }
    const { active, over } = event

    //Cần đảm bảo nếu không tồn tại active hoặc over ( khi kéo ra khỏi phạm vi container ) thì không làm gì (tránh crash trang)
    if (!active || !over) return

    //Nếu vị trí sau khi kéo thả khác với vị trí ban đầu
    if (active.id !== over.id) {
      //Lấy vị trí cũ từ active
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      //Lấy vị trí mới từ over 
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)

      //Dùng arrayMove của dnd-kit để sắp xếp lại mảng columns ban đầu
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // 2 cái console.log dữ liệu này sau này dùng để xử lý gọi API
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
      // console.log('dndOrderedColumns: ', dndOrderedColumns)
      // console.log('dndOrderedColumnsIds: ', dndOrderedColumnsIds)

      //Cập nhật lại state columns ban đầu sau khi đã kéo thả
      setOrderedColumns(dndOrderedColumns)
    }
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }
  //Trigger khi bắt đầu kéo một phần tử
  const handleDragStart = (event) => {
    //console.log('handleDragStart: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }

  //Trigger trong quá trình kéo 1 phần tử
  const handleDragOver = (event) => {
    //console.log('handleDragOver: ', event)
    //Không làm gì thêm nếu đang kéo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    //còn nếu kéo card thì xử lý thêm để có thể kéo card qua lại giữa các columns
    const { active, over } = event

    //Cần đảm bảo nếu không tồn tại active hoặc over ( khi kéo ra khỏi phạm vi container ) thì không làm gì (tránh crash trang)
    if (!active || !over) return

    // activeDraggingCard: là card đang được kéo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    // overCard: là card đang tương tác trên hoặc dưới so với card được kéo ở trên.
    const { id: overCardId } = over

    //tìm 2 cái columns theo cardId
    const activeColumn = findColumByCardId(activeDraggingCardId)
    const overColumn = findColumByCardId(overCardId)

    //nếu không tồn tại 1 trong 2 column thì không làm gì hết, tránh crash trang web
    if (!activeColumn || !overColumn) return

    //xử lý logic ở đây chỉ khi kéo card qua 2 column khác nhau, còn nếu kéo card trong chính column ban đầu của nó thì không làm gì
    //Vì đây đang là đoạn xử lý lúc kéo (handleDragOver), còn xử lý lúc kéo xong xuôi thì nó lại là vấn đề khác ở (handleDragEnd)
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns(prevColumns => {
        //Tìm vị trí (index) của cái overCard trong column đích (nơi card sắp được thả)
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
        console.log('overCardIndex: ', overCardIndex)

        return [...prevColumns]
      })
    }
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }
  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          bgcolor: (theme) => (
            theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'
          ),
          width: '100%',
          height: (theme) => theme.trelloCustom.boardContentHeight,
          p: '10px 0'
        }}
      >
        <ListColumns columns={orderedColumns}/>
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/>}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData}/>}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
