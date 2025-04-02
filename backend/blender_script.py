import bpy
import sys

file_path = sys.argv[-1]

# Clear existing objects
bpy.ops.wm.read_factory_settings(use_empty=True)


bpy.ops.import_scene.gltf(filepath=file_path)

obj = bpy.context.selected_objects[0]


obj.rotation_mode = 'XYZ'
frame_start, frame_end = 1, 120
bpy.context.scene.frame_start = frame_start
bpy.context.scene.frame_end = frame_end

obj.rotation_euler = (0, 0, 0)
obj.keyframe_insert(data_path="rotation_euler", frame=frame_start)


obj.rotation_euler = (0, 0, 3.14) 
obj.keyframe_insert(data_path="rotation_euler", frame=frame_end)

bpy.ops.wm.save_as_mainfile(filepath="processed_avatar.blend")
print("Blender processing complete.")
