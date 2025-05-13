/**
 * Graph defines the chat graph chain
 */
import {
  END,
  MemorySaver,
  START,
  StateGraph,
  MessagesAnnotation,
} from '@langchain/langgraph'
import { callModel } from './nodes'

// Define graph
const graph = new StateGraph(MessagesAnnotation)
  .addNode('callModel', callModel)
  .addEdge(START, 'callModel')
  .addEdge('callModel', END)

// Persistence
const memory = new MemorySaver()

// Export compiled graph
export default graph.compile({ checkpointer: memory })
